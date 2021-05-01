import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {POST_BY_USER_URL, POST_URL} from "../constants/enpoints";
import {LocalStorageService} from "ngx-store";

@Injectable()
export class PostService {

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
  }

  getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(POST_URL);
  }

  getPostsByUserId(userId: string): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${POST_BY_USER_URL}${userId}`);
  }

  savePost(post: Post): Observable<Post> {
    const builtPost = this.build(post);
    return this.httpClient.post<Post>(POST_URL, builtPost);
  }

  updatePost(post: Post): Observable<Post> {
    const builtPost = this.build(post);
    return this.httpClient.put<Post>(`${POST_URL}/${post.id}`, builtPost);
  }

  build(post: Post): Post{
    const builtPost = new Post();
    builtPost.description = post.description;
    builtPost.visibility = post.isPublic? 'public' : 'private';
    builtPost.placeId = post.placeId;
    builtPost.userId = this.localStorageService.get('user_id');
    return builtPost;
  }
}
