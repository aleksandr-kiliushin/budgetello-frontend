export interface RequestOptions extends RequestInit {
  headers: {
    Authorization: string
    "Content-Type": "application/json"
  }
}

export interface RequestDataWithoutPayload {
  url: string
}
export interface RequestDataWithPayload extends RequestDataWithoutPayload {
  payload: Record<string, unknown>
}
