export interface Command {
    deviceIp: string;
    commandPayload: CommandPayload;
}

export interface CommandPayload {
    id: number;
    method: string;
    params: any[];
}
