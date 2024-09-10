function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
      {children}
    </span>
  )
}

export default Tag
