import axios from "axios";
import { useForm } from "react-hook-form";

const LearnSkill = () => {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (formData) => {
    try {
      const userId = localStorage.getItem("id");
      formData.userId = userId;

      
      console.log(data)
      await axios.post("/addrequest", formData);
      alert("Skill request submitted!");
      reset();
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to request skill. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-xl font-bold text-center mb-4">Learn a Skill</h1>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block font-medium">Skill Name</label>
            <input 
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Enter the skill you want to learn"
            />
          </div>

          <div>
            <label className="block font-medium">Why do you want to learn this skill?</label>
            <textarea 
              {...register("description", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Explain why you're interested..."
            />
          </div>

          <div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Submit Skill Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnSkill;
