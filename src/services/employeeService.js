import { fetchUsers } from "./employeeApi.js";
import { DEPARTMENTS, JOB_TITLES } from "../utils/constants.js";

function toEmployee(user, index) {
  const department = DEPARTMENTS[index % DEPARTMENTS.length];
  const titles = JOB_TITLES[department];
  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    title: titles[Math.floor(index / DEPARTMENTS.length) % titles.length],
    department,
    availability: index % 5 === 1 ? "Out" : "Available",
    email: user.email,
    phone: user.phone,
    city: user.location.city,
    photo: user.picture.medium,
  };
}

export async function loadInitialEmployees() {
  const users = await fetchUsers(24);
  return users.map(toEmployee);
}
