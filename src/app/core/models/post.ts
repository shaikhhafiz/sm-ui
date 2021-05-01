import {User} from "./user";
import {Place} from "./place";

export class Post {
  id: string;
  userId: string;
  user: User;
  description: string;
  visibility: string;
  isPublic: boolean;
  placeId: string;
  place: Place;
}
