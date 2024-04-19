import Link from "next/link"

export default async function Page() {
  return (
    <div className='max-w-sm mx-auto flex flex-col'>
      <div>Provided cafeId doesnt exist in our database yet</div>
      <Link
        className='text-white bg-blue-700 mt-2 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
        href='/cafe/add'>
        Add your cafe!
      </Link>
    </div>
  )
}
