import Image from "next/image";
import TaskList from '../components/TasksList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TaskList/>
      
    </main>
  );
}
