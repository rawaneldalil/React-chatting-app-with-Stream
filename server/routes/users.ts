import { FastifyInstance } from "fastify";
import  { StreamChat }  from 'stream-chat'

const streamChat = StreamChat.getInstance(process.env.STREAM_API_KEY!, process.env.STREAM_PRIVATE_API_KEY!);

const TOKEN_USER_ID_MAP = new Map<string, string>()

export async function userRoutes(app:FastifyInstance) {
    app.post<{ Body: { id:string, name:string, image?:string }}>('/signup',
    async (request, response) => { 
        const  { id, name, image } = request.body;
        if (id == null  || id === '' || name == null || name === '') {
            return response.status(400).send;
        }
        
        const existingUsers = await streamChat.queryUsers({ id } );
        if ( existingUsers.users.length > 0) {
            return response.status(400).send('This ID is taken');
        }
        await streamChat.upsertUser({ id, name, image })
     });

    
    
     app.post<{ Body: { id: string } }>("/login", async (request, response) => {
        const { id } = request.body
        if (id == null || id === "") {
          return response.status(400).send
        }
    
        const {
          users: [user],
        } = await streamChat.queryUsers({ id })
        if (user == null) return response.status(401).send()
    
        const token = streamChat.createToken(id)
        TOKEN_USER_ID_MAP.set(token, user.id);
    
        return {
          token,
          user: { name: user.name, id: user.id, image: user.image },
        }
      })


      app.post<{ Body: { token: string } }>("/logout", async (request, response) => { 
        const token = request.body.token;
        if (token == null || token === "") return response.status(400).send();

        const id = TOKEN_USER_ID_MAP.get(token);
        if (id == null || id === "") return response.status(400).send();

        await streamChat.revokeUserToken(id, new Date());
        TOKEN_USER_ID_MAP.delete(token);
       })
    
}