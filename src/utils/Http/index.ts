import { RequestDataWithPayload, RequestDataWithoutPayload, RequestOptions } from "./types"

const backendUrlStartByNodeEnv = {
  development: "http://localhost:3080",
  production: "https://personal-application-api.herokuapp.com:443",
  test: "http://localhost:3080",
}

class Http {
  private static get requestOptions(): RequestOptions {
    return {
      headers: {
        Authorization: localStorage.authToken,
        "Content-Type": "application/json",
      },
    }
  }

  static createFullUrl(url: string): string {
    if (
      process.env.NODE_ENV !== "development" &&
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "test"
    ) {
      throw new Error(
        `process.env.NODE_ENV must have one of the following values: ['development', 'production', 'test']. Received: ${process.env.NODE_ENV}`
      )
    }
    return backendUrlStartByNodeEnv[process.env.NODE_ENV] + url
  }

  static async delete<T>({ url }: RequestDataWithoutPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      method: "DELETE",
    })
    return await response.json()
  }

  static async get<T>({ url }: RequestDataWithoutPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, this.requestOptions)
    return await response.json()
  }

  static async patch<T>({ payload, url }: RequestDataWithPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: "PATCH",
    })
    return await response.json()
  }

  static async post<T>({ payload, url }: RequestDataWithPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: "POST",
    })
    return await response.json()
  }
}

export default Http
