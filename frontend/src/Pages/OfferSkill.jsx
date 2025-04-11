import axios from "axios";
import { useForm } from "react-hook-form";

const OfferSkill = () => {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (formData) => {
    try {
      const userId = localStorage.getItem("id");
      formData.userId = userId;

      await axios.post("/addskill", formData);
      alert("Skill added successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting skill:", error);
      alert("Failed to add skill. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-xl font-bold text-center mb-4">Offer a Skill</h1>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block font-medium">Skill Name</label>
            <input 
              type="text"
              {...register("skillName", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Enter the skill you want to offer"
            />
          </div>

          <div>
            <label className="block font-medium">Skill Description</label>
            <textarea 
              {...register("description", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Describe what you will teach..."
            />
          </div>

          <div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Submit Skill Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferSkill;
