import { createUploadthing, type FileRouter } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeid' }); // Fake auth function

export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: '2MB', maxFileCount: 1, minFileCount: 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }: { req: Request }) => {
			// This code runs on your server before upload
			const user = await auth(req);
			// If you throw, the user will not be able to upload
			if (!user) throw new Error('Unauthorized');
			// / Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		// accepts a callback
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			// console.log("Upload complete for userId:", metadata.userId);

			return file.url;
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
