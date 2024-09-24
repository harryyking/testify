"use client";
import { useState, useEffect } from 'react'
import Card from './Card';
import Link from 'next/link';




const Tabs = () => {
  const [activeTab, setActiveTab] = useState("new"); // Default to 'new'
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonies = async () => {
      setLoading(true);
      
      try {
        // Create URL with search param for type (new, hot, top)
        const url = `/api/display?type=${activeTab}`;
        const response = await fetch(url);
        const data = await response.json();
        setTestimonies(data);
      } catch (error) {
        console.error("Error fetching testimonies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, [activeTab]);

  return (
    <section className='space-y-4'>
      <div role="tablist" className=" tabs tabs-bordered ">
      <a role="tab" className={` tab ${activeTab === "hot" ? 'tab-active' : "" }`} onClick={() => setActiveTab("hot")}>🔥 Hot</a>
      <a role="tab" className={` tab ${activeTab === "new" ? 'tab-active' : "" }`} onClick={() => setActiveTab("new")}>✨ New</a>
      <a role="tab" className={` tab ${activeTab === "top" ? 'tab-active' : "" }`} onClick={() => setActiveTab("top")}>🏆 Top</a>

</div>


   {testimonies.map((testimony) => (
      <Card
      key={testimony._id}
      testimony={testimony}
      />
    ))}

    </section>
    
  )
}

export default Tabs