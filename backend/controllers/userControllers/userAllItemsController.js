import Item from "../../models/itemModel.js";
import Booking from "../../models/BookingModel.js";
import { errorHandler } from "../../utils/error.js";

//show all items to user
export const listAllItems = async (req, res, next) => {
  try {
    const { category } = req.query;

    let filter = { isDeleted: false, isAvailable: true, isAdminApproved: true };

    if (category && category !== "all") {
      filter.category = category;
    }

    const items = await Item.find(filter);

    if (!items || items.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "something went wrong"));
  }
};

//show one item Detail to user
export const showItemDetails = async (req, res, next) => {
  try {
    if (!req.body && !req.params.id) {
      next(errorHandler(409, "item id is required"));
    }
    const id = req.body.id || req.params.id;
    const itemDetail = await Item.findById(id);

    if (!itemDetail) {
      return next(errorHandler(404, "item not found"));
    }

    res.status(200).json(itemDetail);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "something went wrong"));
  }
};

//check item availability
export const checkAvailability = async (req, res, next) => {
  try {
    if (!req.body) {
      next(errorHandler(401, "bad request no body"));
    }
    const { pickupDate, dropOffDate, itemId } = req.body;

    if (!pickupDate || !dropOffDate || !itemId) {
      console.log("pickup, dropoffdate and itemId is required");
      next(errorHandler(409, "pickup, dropoffdate and itemId is required"));
    }

    // Check if pickupDate is before dropOffDate
    if (pickupDate >= dropOffDate) {
      return next(errorHandler(409, "Invalid date range"));
    }

    const sixHoursLater = new Date(dropOffDate);
    sixHoursLater.setTime(sixHoursLater.getTime() + 6 * 60 * 60 * 1000);

    //checking database for overlapping pickup and dropoffDates
    const existingBookings = await Booking.find({
      itemId,
      $or: [
        { pickupDate: { $lt: dropOffDate }, dropOffDate: { $gt: pickupDate } },
        { pickupDate: { $gte: pickupDate, $lt: dropOffDate } },
        { dropOffDate: { $gt: pickupDate, $lte: dropOffDate } },
        {
          pickupDate: { $lte: pickupDate },
          dropOffDate: { $gte: dropOffDate },
        },
        {
          pickupDate: { $gte: sixHoursLater },
        },
      ],
    });

    // If there are overlapping bookings, return an error
    if (existingBookings.length > 0) {
      return next(
        errorHandler(400, "Item is not available for the specified time period")
      );
    }

    // If no overlapping bookings, item is available
    return res.status(200).json({ message: "Item is available for booking" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error in checkAvailability"));
  }
};

//search items with filters
export const searchItems = async (req, res, next) => {
  try {
    if (req && req.body) {
      const {
        pickup_district,
        pickup_location,
        dropoff_location,
        pickuptime,
        dropofftime,
        category,
        subcategory,
      } = req.body;

      //checking if dropOfftime is before or equals to pickupTime
      const pickuptimeDate = new Date(pickuptime.$d || pickuptime);
      const dropofftimeDate = new Date(dropofftime.$d || dropofftime);

      const dateDifferenceInMilliseconds =
        dropofftimeDate.getTime() - pickuptimeDate.getTime();
      const dateDifferenceInDays =
        dateDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

      if (dropofftimeDate <= pickuptimeDate || dateDifferenceInDays < 1) {
        return next(
          errorHandler(401, "dropoff date should be later than pickup date")
        );
      } else {
        let matchQuery = {
          isDeleted: false,
          isAvailable: true,
          isAdminApproved: true,
          district: pickup_district,
          location: pickup_location,
        };

        // Add category filter if provided
        if (category && category !== "all") {
          matchQuery.category = category;
        }

        // Add subcategory filter if provided
        if (subcategory) {
          matchQuery.subcategory = subcategory;
        }

        const search = await Item.aggregate([
          {
            $match: matchQuery,
          },
          {
            $group: {
              _id: {
                model: "$model",
                location: "$location",
                category: "$category",
                subcategory: "$subcategory",
                brand: "$brand",
              },
              items: {
                $push: "$$ROOT",
              },
            },
          },
          {
            $project: {
              _id: 1,
              items: {
                $cond: {
                  if: {
                    $gt: [
                      {
                        $size: "$items",
                      },
                      1,
                    ],
                  },
                  then: {
                    $arrayElemAt: ["$items", 0],
                  },
                  else: "$items",
                },
              },
            },
          },
          {
            $unwind: {
              path: "$items",
            },
          },
          {
            $replaceRoot: {
              newRoot: "$items",
            },
          },
        ]);

        if (search && search.length > 0) {
          res.status(200).json(search);
        } else {
          res.status(200).json([]);
        }
      }
    } else {
      res.status(400).json({ message: "please provide all the details" });
    }
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "something went wrong while searching items"));
  }
};

// Get items by category
export const getItemsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const items = await Item.find({
      category,
      isDeleted: false,
      isAvailable: true,
      isAdminApproved: true,
    });

    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error fetching items by category"));
  }
};

// Get featured items (highly rated or popular)
export const getFeaturedItems = async (req, res, next) => {
  try {
    const items = await Item.find({
      isDeleted: false,
      isAvailable: true,
      isAdminApproved: true,
      rating: { $gte: 4 },
    })
      .limit(10)
      .sort({ rating: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error fetching featured items"));
  }
};
