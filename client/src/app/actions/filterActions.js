export const FILTER_NEW_TO_OLD = "FILTER_NEW_TO_OLD";
export const FILTER_OLD_TO_NEW = "FILTER_OLD_TO_NEW";
export const FILTER_MOST_LIKED = "FILTER_MOST_LIKED";
export const FILTER_MOST_COMMENTED = "FILTER_MOST_COMMENTED";

export const FILTER_P_NEW_TO_OLD = "FILTER_P_NEW_TO_OLD";
export const FILTER_P_OLD_TO_NEW = "FILTER_P_OLD_TO_NEW";
export const FILTER_P_MOST_LIKED = "FILTER_P_MOST_LIKED";
export const FILTER_P_MOST_COMMENTED = "FILTER_P_MOST_COMMENTED";

export const changeFilter = (filter) => {
  switch (filter) {
    case "newToOldFEED":
      return {
        type: FILTER_NEW_TO_OLD,
      };
    case "oldToNewFEED":
      return {
        type: FILTER_OLD_TO_NEW,
      };
    case "mostLikedFEED":
      return {
        type: FILTER_MOST_LIKED,
      };
    case "mostCommentedFEED":
      return {
        type: FILTER_MOST_COMMENTED,
      };
    case "newToOldPROFILE":
      return {
        type: FILTER_P_NEW_TO_OLD,
      };
    case "oldToNewPROFILE":
      return {
        type: FILTER_P_OLD_TO_NEW,
      };
    case "mostLikedPROFILE":
      return {
        type: FILTER_P_MOST_LIKED,
      };
    default:
      return {
        type: FILTER_P_MOST_COMMENTED,
      };
  }
};


export const applyFilter = (posts, filter) => {
  switch (filter) {
    case "newToOld":
      let newToOldFeed = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return newToOldFeed;
    case "oldToNew":
      let oldToNewFeed = posts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return oldToNewFeed;
    case "mostLiked":
      let mostLikedFeed = posts.sort(
        (a, b) =>
          b.usersLiked.length - a.usersLiked.length ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      return mostLikedFeed;
    default:
      let mostCommentedFeed = posts.sort(
        (a, b) =>
          b.comments.length - a.comments.length ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      return mostCommentedFeed;
  }
};
