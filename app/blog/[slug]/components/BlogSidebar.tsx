import RelatedPost from './RelatedPost';

export default function BlogSidebar() {
  return (
    <aside className="lg:w-1/3 space-y-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src="/placeholder.svg?height=150&width=300"
          alt="Author avatar"
          className="w-full h-32 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">About the Author</h2>
          <p className="text-gray-600 mb-4">
            John Doe is a passionate writer and tech enthusiast. He loves sharing his knowledge and
            experiences with others through his blog.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            More about John
          </a>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
          <div className="space-y-4">
            <RelatedPost
              title="Another Interesting Article"
              excerpt="A brief preview of another fascinating blog post that readers might enjoy."
              slug="another-interesting-article"
            />
            <RelatedPost
              title="Yet Another Great Post"
              excerpt="One more intriguing article that's sure to capture the reader's attention."
              slug="yet-another-great-post"
            />
            <RelatedPost
              title="Don't Miss This One"
              excerpt="An unmissable post that's creating buzz among our readers."
              slug="dont-miss-this-one"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
