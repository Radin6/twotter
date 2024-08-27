import React from "react";

interface ContainerProps {
  children: React.ReactNode
  style?: string
}

function Container({ children, style }: ContainerProps) {
  return (
    <main className={`flex flex-row mx-auto justify-center max-w-[1000px] min-h-screen ${style}`}>
      {children}
    </main>
  )
}

export default Container;