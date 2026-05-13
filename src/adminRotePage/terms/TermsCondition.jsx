import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Navigate } from "../../Navigate";
import { message, Spin } from "antd";
import { useGetTermsConditionsQuery, usePostTermsConditionMutation } from "../../page/redux/api/admin/manageApiAdmin";


const TermsCondition = () => {
  
  const [addTerms, {isLoading}] = usePostTermsConditionMutation();
  const { data: termData } = useGetTermsConditionsQuery();
  console.log(termData);
  const editor = useRef(null);
  const [content, setContent] = useState("");


  const handleTerms = async () => {
    const data = {
      description: content,
    };


    const res = await addTerms(data).unwrap();
 

    message.success(res?.message);
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  useEffect(() => {
    setContent(termData?.data?.description);
  }, [termData]);
  return (
    <div className="  p-3 ">
       <Navigate title="Terms & Condition" />

      <JoditEditor
      
          ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
      />

      <div className="mt-5 flex justify-center">
        <button   type="submit"
                disabled={isLoading}
                  onClick={handleTerms}
                className={`px-4 py-3 rounded text-white flex justify-center items-center gap-2 ${
                  isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Spin size="small" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Update"
                )}
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
