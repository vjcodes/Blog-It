import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

type CreatePostParams = {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
};

type UpdatePostParams = {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
};

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: CreatePostParams) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: UpdatePostParams
  ) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug: string) {
    try {
      const post = await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
