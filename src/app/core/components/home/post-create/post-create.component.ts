import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Post} from "../../../models/post";
import {Place} from "../../../models/place";
import {PlaceService} from "../../../services/place.service";
import {PostService} from "../../../services/post.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  providers: [PlaceService, PostService]
})
export class PostCreateComponent implements OnInit{

  @Output() postSuccessEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  post: Post = new Post();
  places: Place[] = [];

  constructor(private placeService: PlaceService, private postService: PostService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    //TODO Move initial logic to another place
    this.post.place = new Place();
    this.post.isPublic = true;
    this.getPlaces();
  }

  getPlaces(){
    this.placeService.getPlaces().subscribe(
      places => this.places = places,
      error => console.log(error)
    )
  }

  save() {
    this.postService.savePost(this.post).subscribe(
      post => {
        //TODO show toast message and handle response by respone status
        if(post.id) {
          this.toastr.success('Post created successfully', 'Post');
        } else {
          this.toastr.error('Post creation failed', 'Post')
        }
        this.postSuccessEmitter.emit(true);
      },
      error => this.toastr.error('Post creation failed', 'Post')

    )
  }
}
