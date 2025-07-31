import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MapPinIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Friends</h1>
            <p className="text-base-content opacity-70 mt-2">
              Connect with your language learning partners
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn btn-outline btn-sm">
              Find New Friends
            </Link>
          </div>
        </div>

        {/* Friends Count */}
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Friends</div>
            <div className="stat-value text-primary">{friends.length}</div>
            <div className="stat-desc">
              {friends.length === 1 ? "language partner" : "language partners"}
            </div>
          </div>
        </div>

        {/* Friends Grid */}
        {friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-6 space-y-4">
                  {/* Friend Info */}
                  <div className="flex items-center gap-4">
                    <div className="avatar size-16 rounded-full">
                      <img src={friend.profilePic} alt={friend.fullName} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                      {friend.location && (
                        <div className="flex items-center text-xs opacity-70 mt-1">
                          <MapPinIcon className="size-3 mr-1" />
                          {friend.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1.5">
                    {friend.nativeLanguage && (
                      <span className="badge badge-secondary">
                        {getLanguageFlag(friend.nativeLanguage)}
                        Native: {capitialize(friend.nativeLanguage)}
                      </span>
                    )}
                    {friend.learningLanguage && (
                      <span className="badge badge-outline">
                        {getLanguageFlag(friend.learningLanguage)}
                        Learning: {capitialize(friend.learningLanguage)}
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  {friend.bio && (
                    <p className="text-sm opacity-70 line-clamp-2">{friend.bio}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      <MessageCircleIcon className="size-4 mr-2" />
                      Message
                    </Link>
                    <Link
                      to={`/call/${friend._id}`}
                      className="btn btn-outline btn-sm"
                    >
                      <PhoneIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {friends.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">No friends yet</h3>
              <p className="text-base-content opacity-70 mb-6">
                Start connecting with language learners to practice together!
              </p>
              <Link to="/" className="btn btn-primary">
                Find Language Partners
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage; 