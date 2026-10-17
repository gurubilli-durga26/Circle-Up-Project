export default function Loader({ text = "Loading..." }) {
  return <div className="flex min-h-[160px] items-center justify-center text-gray-400">{text}</div>;
}
