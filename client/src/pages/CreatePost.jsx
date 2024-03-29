import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { preview } from "../assets"
import { getRandomPrompt } from "../utils"
import { FormField, Loader } from "../components"

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  }
  const handleSurpriseMe = () => {
    const randomPropt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPropt})
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
          // credentials: 'include',
        });

        const data = await response.json();
       
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };
  return (
    <section className="max-w-7xl mx-auto "> 
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images generated through DALL-E AI and share them with the community.
        </p>
      </div>
      <form className="mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 ">
          {/* <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Ahmad"
            value={form.name}
            handleChange = {handleChange}
          /> */}
           <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            generatingImage={generatingImage}
            generateImage={generateImage}
            showButton={true}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center max-w-2xl mx-auto gap-2">
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
                <img src={preview }  alt="preview" className="w-9/12 h-9/12 object-contain opacity-40"/>
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader/>
              </div>
            )}
            </div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
                <img src={preview }  alt="preview" className="w-9/12 h-9/12 object-contain opacity-40"/>
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader/>
              </div>
            )}
            </div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
                <img src={preview }  alt="preview" className="w-9/12 h-9/12 object-contain opacity-40"/>
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader/>
              </div>
            )}
            </div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
                <img src={preview }  alt="preview" className="w-9/12 h-9/12 object-contain opacity-40"/>
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader/>
              </div>
            )}
           </div>
          </div>
        </div>
        {/* <div className="mt-5 flex gap-5">
          <button type="button" onClick={generateImage} className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generatingImage ? "Generating..." : "Generate"}
          </button>
        </div> */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have generated the image you want, you can share it with others in the community.</p>
          <button type="submit" className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : "Share with the community"}
          </button>
        </div>
      </form>
  </section>
  )
}

export default CreatePost