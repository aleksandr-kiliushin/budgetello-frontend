class Http {
  private static get requestOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.authToken,
        'Content-Type': 'application/json',
      },
    }
  }
  static async delete({ url }: RequestDataWithoutPayload) {
    const response = await fetch(url, {
      ...this.requestOptions,
      method: 'DELETE',
    })
    return await response.json()
  }
  static async get({ url }: RequestDataWithoutPayload) {
    const response = await fetch(url, this.requestOptions)
    return await response.json()
  }
  static async patch({ payload, url }: RequestDataWithPayload) {
    const response = await fetch(url, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'PATCH',
    })
    return await response.json()
  }
  static async post({ payload, url }: RequestDataWithPayload) {
    const response = await fetch(url, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'POST',
    })
    return await response.json()
  }
}

interface RequestDataWithoutPayload {
  url: string
}
interface RequestDataWithPayload extends RequestDataWithoutPayload {
  payload: Record<string, unknown>
}

export default Http
