import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PLACE_URL} from "../constants/enpoints";
import {Place} from "../models/place";

@Injectable()
export class PlaceService {

  constructor(private httpClient: HttpClient) {
  }

  getPlaces(): Observable<Place[]>{
    return this.httpClient.get<Place[]>(PLACE_URL);
  }
}
