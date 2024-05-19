import { IncomingHttpHeaders } from 'http'
import { Request } from 'express'

interface UserRequest extends Request {
  headers           : IncomingHttpHeaders & {
    user?: {
      id: number,
      name: string,
      email: string
    }
  }
}

export { UserRequest }