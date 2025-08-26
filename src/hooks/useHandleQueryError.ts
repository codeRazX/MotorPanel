import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils";

export default function useHandleQueryError(isError: boolean, error: Error | null) {
  const navigate = useNavigate()

  useEffect(() => {
    if (isError && error) {
      notifyError(error)
      navigate('/')
    }
  }, [isError, error, navigate])
 
}
