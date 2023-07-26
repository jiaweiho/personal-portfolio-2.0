'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsIntersecting(entry.isIntersecting)
        })
      },
      { rootMargin: "-300px" }
    )
    console.log(isIntersecting)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isIntersecting])

  useEffect(() => {
    if (!ref.current) return
    
    if (isIntersecting) {
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.add("slide-in");
      });
    } else {
      ref.current.querySelectorAll("div").forEach((el) => {
        el.classList.remove("slide-in");
      });
    }
  }, [isIntersecting]);

  return (
    <div className="App">
      <header>This is the Header</header>
      <main ref={ref}>
        <div className="child-one">Child One</div>
        <div className="child-two">Child Two</div>
      </main>
      <footer>This is the Footer</footer>
    </div>
  )
}
