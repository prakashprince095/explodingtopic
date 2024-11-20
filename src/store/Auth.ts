// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";
// import { persist } from "zustand/middleware";

// import { AppwriteException, ID, Models } from "appwrite";
// import { account } from "@/models/client/config";

// export interface UserPrefs {
//   reputation: number;
// }

// interface IAuthStore {
//   session: Models.Session | null;
//   jwt: string | null;
//   user: Models.User<UserPrefs> | null;
//   hydrated: boolean;
//   isAuthenticated: boolean; // Add `isAuthenticated` here

//   setHydrated(): void;
//   verfiySession(): Promise<void>;
//   login(
//     email: string,
//     password: string
//   ): Promise<{
//     success: boolean;
//     error?: AppwriteException | null;
//   }>;
//   createAccount(
//     name: string,
//     email: string,
//     password: string
//   ): Promise<{
//     success: boolean;
//     error?: AppwriteException | null;
//   }>;
//   logout(): Promise<void>;
// }

// export const useAuthStore = create<IAuthStore>()(
//   persist(
//     immer((set) => ({
//       session: null,
//       jwt: null,
//       user: null,
//       hydrated: false,
//       isAuthenticated: false, // Initialize `isAuthenticated`

//       setHydrated() {
//         set({ hydrated: true });
//       },

//       async verfiySession() {
//         try {
//           const session = await account.getSession("current");
//           set({ session, isAuthenticated: true }); // Update isAuthenticated when session is verified
//         } catch (error) {
//           console.log(error);
//           set({ isAuthenticated: false }); // Set isAuthenticated to false if verification fails
//         }
//       },

//       async login(email: string, password: string) {
//         try {
//           const session = await account.createEmailPasswordSession(email, password);
//           const [user, { jwt }] = await Promise.all([
//             account.get<UserPrefs>(),
//             account.createJWT(),
//           ]);

//           if (!user.prefs?.reputation) {
//             await account.updatePrefs<UserPrefs>({ reputation: 0 });
//           }

//           set({ session, user, jwt, isAuthenticated: true }); // Set `isAuthenticated` to true on login success

//           return { success: true };
//         } catch (error) {
//           console.log(error);
//           return {
//             success: false,
//             error: error instanceof AppwriteException ? error : null,
//           };
//         }
//       },

//       async createAccount(name: string, email: string, password: string) {
//         try {
//           await account.create(ID.unique(), email, password, name);
//           return { success: true };
//         } catch (error) {
//           console.log(error);
//           return {
//             success: false,
//             error: error instanceof AppwriteException ? error : null,
//           };
//         }
//       },

//       async logout() {
//         try {
//           await account.deleteSessions();
//           set({ session: null, jwt: null, user: null, isAuthenticated: false }); // Reset `isAuthenticated` on logout
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     })),
//     {
//       name: "auth",
//       onRehydrateStorage() {
//         return (state, error) => {
//           if (!error && state) {
//             state.setHydrated(); // Use the `setHydrated` method within `state`
//             state.isAuthenticated = !!state.session; // Directly modify the state properties instead of using `set`
//           }
//         };
//       }
//     }
//   )
// );
