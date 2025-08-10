import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  fullName: string;
  email: string | null;
  mobile: string;
  password: string;
  roleId?: string;
  profileId?: string;
  designationId?: string;
  departmentId?: string;
  isActive: boolean;
  isStaff: boolean;
  profilePic: string | null;
  createdBy: string | null;
  verifyPassword: (password: string) => Promise<boolean>;
  isModified: (password: string) => boolean;
}

export interface IProfile extends Document {
  dob: string | null;
  gender: string | null;
  isRegular: boolean;
  userId?: string;
}

export interface IDepartment extends Document {
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface IDesignation extends Document {
  name: string;
  description: string | null;
  departmentId?: string;
  level: number;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparce: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isStaff: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    designationId: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const profileSchema = new Schema<IProfile>(
  {
    dob: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    isRegular: {
      type: Boolean,
      required: false,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      unique: true,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const designationSchema = new Schema<IDesignation>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    level: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Password hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare passwords
userSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
export const Profile = model<IProfile>("Profile", profileSchema);
export const Department = model<IDepartment>("Department", departmentSchema);
export const Designation = model<IDesignation>(
  "Designation",
  designationSchema
);
