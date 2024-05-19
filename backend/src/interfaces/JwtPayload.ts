interface JwtPayload {
    user: {
      id: number,
      name: string,
      email: string
    };
  }
  
  export { JwtPayload };