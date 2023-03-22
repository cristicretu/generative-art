import React, { useRef, useEffect } from 'react'

import dynamic from 'next/dynamic'

const Sketch = dynamic(import('react-p5'), { ssr: false })

interface WavesProps {
  seed: number
}

const Waves: React.FC<WavesProps> = ({ seed }) => {
  const wavesRef = useRef()

  // useEffect(() => {
  //   if (wavesRef.current) {
  //     ;(wavesRef.current as any).randomSeed(seed)
  //   }
  // }, [seed])

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2).parent(
      canvasParentRef
    )
    p5.noiseSeed(seed)
    p5.colorMode(p5.HSB, 360, 100, 100)
  }

  const draw = (p5: any) => {
    p5.background(0, 0, 0)
    p5.translate(0, p5.windowHeight / 2)

    const xOffset = p5.frameCount * 0.01

    for (let y = -p5.windowHeight / 2; y < p5.windowHeight / 2; y += 15) {
      for (let x = 0; x < p5.windowWidth; x += 10) {
        const noiseVal = p5.noise(x * 0.01, y * 0.01, xOffset)
        const hueVal = p5.map(noiseVal, 0, 1, 220, 260)
        const satVal = p5.map(noiseVal, 0, 1, 70, 100)
        const brightVal = p5.map(noiseVal, 0, 1, 70, 100)
        p5.stroke(hueVal, satVal, brightVal)
        p5.point(x, y + p5.map(noiseVal, 0, 1, -30, 30))
      }
    }
  }

  return <Sketch setup={setup} draw={draw} ref={wavesRef as any} />
}

export default Waves
