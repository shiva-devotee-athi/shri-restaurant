import { Category } from "@/models/recipe";
import { Role } from "@/models/role";
import { User } from "@/models/user";

const roles = [
  {
    name: "Admin",
    role: "ADMIN",
  },
  {
    name: "Waiter",
    role: "WAITER",
  },
  {
    name: "Chef",
    role: "CHEF",
  },
  {
    name: "Customer",
    role: "CUSTOMER",
  },
  {
    name: "Delivery Staff",
    role: "DELIVERY",
  },
  {
    name: "Security",
    role: "SECURITY",
  },
];

const categories = [
  { name: "Veg", details: "Food Type: Veg" },
  { name: "Sweet", details: "Food Type: Sweet" },
  { name: "Soup", details: "Food Type: Soup" },
  { name: "Pizza", details: "Food Type: Pizza" },
  { name: "Non-Veg", details: "Food Type: Non-Veg" },
  { name: "Juice", details: "Food Type: Juice" },
  { name: "IceCream", details: "Food Type: IceCream" },
  { name: "Cake", details: "Food Type: Cake" },
];

async function createRoles() {
  try {
    const roleData = await Role.find();
    if (roleData.length <= 0) {
      Role.insertMany(roles);
      return console.log("Successfully Role created");
    }
    return console.log("Already Role created");
  } catch (error) {
    return console.log(error);
  }
}

async function createAdmin() {
  const data = {
    fullName: "Vijayathiraj",
    email: "vijayathiraj99@gmail.com",
    mobile: "918870762077",
    roleId: "68657f0ddfc80da4c489b7f5",
    password: "123456789",
    isStaff: false,
  };
  try {
    const userData = await User.findOne({
      $or: [{ email: data.email }, { mobile: data.mobile }],
    });
    if (userData) {
      return console.log("Already Existed");
    } else {
      const newUser = await User.create({ ...data });
      await newUser.updateOne({ createdBy: newUser.id });
      return console.log("Successfully created");
    }
  } catch (error) {
    return console.log(error);
  }
}

async function createCategories() {
  try {
    const roleData = await Category.find();
    if (roleData.length <= 0) {
      Category.insertMany(categories);
      return console.log("Successfully Category created");
    }
    return console.log("Already Category created");
  } catch (error) {
    return console.log(error);
  }
}

export { createRoles, createAdmin, createCategories };
