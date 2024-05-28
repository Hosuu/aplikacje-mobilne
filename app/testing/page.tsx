import { TestForm } from "@/components/form/TestForm"

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-16'>
      <TestForm />
    </main>
  )
}
