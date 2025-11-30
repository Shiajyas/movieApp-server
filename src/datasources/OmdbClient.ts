

import axios from 'axios';
import { injectable } from 'tsyringe';
import { OMDB_API_KEY } from '../config/env';

@injectable()
export class OmdbClient {
  base = 'https://www.omdbapi.com/';
  async search(q: string, page = 1) {
    // console.log(q,">>>>");
     
    const res = await axios.get(this.base, { params: { apikey: OMDB_API_KEY, s: q, page }});
    // console.log(res,">>>");
    
    return res.data; 
  }
  async getById(imdbID: string) {
    const res = await axios.get(this.base, { params: { apikey: OMDB_API_KEY, i: imdbID, plot: 'full' }});
    return res.data;
  }
}
