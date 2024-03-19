export class Hello {
  constructor(private readonly name: string) {}

  sayHello() {
    console.log(`hello! ${this.name}`)
  }
}
