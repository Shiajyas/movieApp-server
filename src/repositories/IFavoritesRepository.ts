export interface IFavoritesRepository {
  /**
   * Get all favorite movies of a user
   */
  getAll(userId: string): Promise<any[]>;

  /**
   * Get favorite movies with pagination
   * @param userId - user ID
   * @param page - current page number
   * @param limit - items per page
   */
  getPaginated(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ list: any[]; total: number }>;

  /**
   * Add a movie to favorites of user
   */
  add(userId: string, movie: any): Promise<any[]>;

  /**
   * Remove a movie from favorites of user
   */
  remove(userId: string, imdbID: string): Promise<any[]>;
}
