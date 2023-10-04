   import { CreatePlayerRequest } from "src/types/playerTypes";
   
   describe('Test the CreatePlayerRequest Interface', () => {
     it('should have a name property of type string', () => {
       const request: CreatePlayerRequest = {
         name: 'Amilkar Palangana',
         password: 'myFavouritePassword',
       };
   
       expect(typeof request.name).toBe('string');
     });
   
     it('should have a password property of type string', () => {
       const request: CreatePlayerRequest = {
         name: 'John Doe',
         password: 'password123',
       };
   
       expect(typeof request.password).toBe('string');
     });
   });
   