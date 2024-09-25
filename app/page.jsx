import Tabs from "@/components/Tabs";
import Link from "next/link";


export default function Home() {
  return (
    <section className="space-y-8 min-h-screen">
      <div className="text-center font-medium space-y-4">
        <h1 className="text-3xl font-bold">
        Join Thousands of Christians Around the World Sharing Their Life-Changing Stories
        </h1>
        <p> <span className="link link-primary">Upvote & Comment</span> your favorites. <a href="/new" className="link link-primary">Write</a> to Inspire✍. <br />  No account needed!</p>
      </div>

      <Tabs/>

      <div className="divider"></div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">What is Testify?</h1>

        <p className="leading-normal">
        Testify is a global platform for Christian communities to share life-changing experiences 
        and stories of God's grace. <br />
        We believe that by sharing these powerful testimonies, 
        we can inspire and uplift one another, 
        creating a growing archive of faith-filled stories from 
        believers around the world. <br />
        Join us in building a global community where your 
        story can make a difference in someone’s life
        </p>

        <Link href="/support">
        <button className="btn btn-primary my-4">SUPPORT THE VISION</button>
        </Link>
     

        <p>
          If you have any feedback, please reach out to me,
          Harry King , the creator of Testify.
        </p>
      </div>
      
      

    </section>
  );
}
