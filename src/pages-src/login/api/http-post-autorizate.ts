import { httpServer } from "@/src/shared/api/instance-server";

interface Schema {
  payload: FormData;
  response: {
    access_token: string;
    expires_at: string;
  };
}

export const httpPostAutorizate = async (payload: Schema["payload"]) => {
  const response = await httpServer.post<Schema["response"]>(
    "/authenticate",
    payload
  );
  return response.data;
};
