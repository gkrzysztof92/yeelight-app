const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const path = require("path");
const url = require("url");
const dgram = require("dgram");
var net = require("net");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../dist/yeelight-app/index.html"),
      protocol: "file",
      slashes: true
    })
  );
  win.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on("discavery-devices", (event, arg) => {
  const discaveryMsg =
    'M-SEARCH * HTTP/1.1\r\nHOST: 239.255.255.250:1982\r\nMAN: "ssdp:discover"\r\nST: wifi_bulb';
  const multicastHost = "239.255.255.250";
  const multicastPort = 1982;

  const client = dgram.createSocket("udp4");

  client.on("message", function(msg, rinfo) {
    let vmsg = msg.toString();
    const device = parseDiscaveryResponse(vmsg);
    event.sender.send("asynchronous-reply", device);
  });

  const dmsg = Buffer.from(discaveryMsg);
  client.send(dmsg, 0, dmsg.length, multicastPort, multicastHost, function(
    err,
    bytes
  ) {});
});

ipcMain.on("send-command", (event, arg) => {
  let client = new net.Socket();
  const address = arg.deviceIp.replace("yeelight://", "").split(":");

  client.on("data", function(data) {
    event.sender.send("command-response", data);
    client.destroy();
  });

  client.connect(
    address[1],
    address[0],
    function() {
      client.write(JSON.stringify(arg.commandPayload) + "\r\n");
    }
  );
});

parseDiscaveryResponse = function(discaveryResponse) {
  const lines = discaveryResponse.split("\n");
  const device = {};
  lines.forEach(line => {
    const field = line.substring(0, line.indexOf(":"));
    switch (field) {
      case "Location":
        device.location = parseDiscaveryResponseLine(line);
        break;
      case "Server":
        device.server = parseDiscaveryResponseLine(line);
        break;
      case "id":
        device.id = parseDiscaveryResponseLine(line);
        break;
      case "model":
        device.model = parseDiscaveryResponseLine(line);
        break;
      case "fw_ver":
        device.fw_ver = parseDiscaveryResponseLine(line);
        break;
      case "support":
        device.support = parseDiscaveryResponseLine(line);
        break;
      case "power":
        device.power = parseDiscaveryResponseLine(line);
        break;
      case "bright":
        device.bright = parseDiscaveryResponseLine(line);
        break;
      case "ct":
        device.ct = parseDiscaveryResponseLine(line);
        break;
      case "rgb":
        device.rgb = parseDiscaveryResponseLine(line);
        break;
      case "hue":
        device.hue = parseDiscaveryResponseLine(line);
        break;
      case "sat":
        device.sat = parseDiscaveryResponseLine(line);
        break;
      case "name":
        device.name = parseDiscaveryResponseLine(line);
        break;
    }
  });
  return device;
};

parseDiscaveryResponseLine = function(line) {
  return line.substring(line.indexOf(":") + 2).replace("\r", "");
};
