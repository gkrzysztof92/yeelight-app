export interface Command {
    deviceIp: string;
    commandPayload: CommandPayload;
}

export interface CommandResponse {
    payload: CommandPayload;
    result: CommandResult;
}

export interface CommandPayload {
    id: number;
    method: string;
    params: any[];
}

export interface CommandResult {
    id: number;
    result: string[];
}
