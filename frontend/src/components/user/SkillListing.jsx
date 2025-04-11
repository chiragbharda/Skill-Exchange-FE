import { useNavigate } from "react-router-dom";

const SkillSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">What would you like to do?</h1>
      
      <div className="flex gap-6">
      
        <div 
          onClick={() => navigate("/offer-skill")} 
          className="cursor-pointer bg-blue-500 text-white p-6 rounded-lg shadow-md text-center w-64 hover:bg-blue-600"
        >
          <h2 className="text-xl font-semibold">Offer a Skill</h2>
          <p className="text-sm mt-2">Teach others and share your expertise.</p>
        </div>

   
        <div 
          onClick={() => navigate("/learn-skill")} 
          className="cursor-pointer bg-green-500 text-white p-6 rounded-lg shadow-md text-center w-64 hover:bg-green-600"
        >
          <h2 className="text-xl font-semibold">Learn a Skill</h2>
          <p className="text-sm mt-2">Find a mentor and learn something new.</p>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;
