export interface IRequestOptions extends RequestInit {
  headers: {
    Authorization: string
    "Content-Type": "application/json"
  }
}

export interface IRequestDataWithoutPayload {
  url: string
}
export interface IRequestDataWithPayload extends IRequestDataWithoutPayload {
  payload: Record<string, unknown>
}
