export function GET() {
  // for (let i = 0; i < 10; i++) {
  //   const user = new User({
  //     name: `testUser${i + 1}`,
  //     points: Math.floor(Math.random() * 100),
  //     emailAddress: "example@mail.com",
  //     login: "null",
  //     password: "null",
  //   })
  //   await user.save()
  // }
  return new Response("Success")
}
