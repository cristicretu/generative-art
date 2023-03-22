import { useState } from 'react'

import Container from 'components/Container'
import { Waves } from 'components/Waves'

export default function Home() {
  const [seed, setSeed] = useState<number>(Math.random() * 1000)

  const handleRefresh = () => {
    setSeed(Math.random() * 1000)
  }
  return (
    <Container>
      <div className='flex flex-col items-center justify-center inset-0'>
        <Waves seed={seed} />
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </Container>
  )
}
