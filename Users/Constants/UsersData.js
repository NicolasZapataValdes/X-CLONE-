export const Users = [
  {
    uid: "user123",
    name: "Juan Pérez",
    userName: "jperez",
    email: "jperez@example.com",
    passWord: "25d55ad283aa40cr2b059e2b7760fa3e566d86fe", // Ejemplo de hash SHA1
    CreatedAt: "2023-11-24T10:25:32Z",
    LastLogIn: "2023-12-01T15:42:10Z",
    isActive: true,
    descripción: "Usuario registrado desde el inicio.",
    photo: "https://example.com/user123.jpg",
    deleted: false,
    followers: ["user456", "user789"],
    followed: ["user345"],
  },
  {
    uid: "user456",
    name: "Ana García",
    userName: "agarcia",
    email: "agarcia@example.com",
    passWord: "a827edc132271d29f6932e333681314e563e8788",
    CreatedAt: "2023-12-05T13:15:08Z",
    LastLogIn: "2023-12-05T13:15:08Z",
    isActive: true,
    descripción: "Nuevo usuario.",
    photo: "",
    deleted: false,
    followers: [],
    followed: [],
  },
  {
    uid: "user789",
    name: "Carlos López",
    userName: "clopez",
    email: "clopez@example.com",
    passWord: "c4ca4238a0b923820dcc509a6f75849b",
    CreatedAt: "2023-12-10T16:30:22Z",
    LastLogIn: "2023-12-15T11:20:54Z",
    isActive: false,
    descripción: "Usuario inisActive.",
    photo: "https://example.com/user789.png",
    deleted: false,
    followers: [],
    followed: [],
  },
  {
    uid: "user012",
    name: "María Rodríguez",
    userName: "mrodriguez",
    email: "mrodriguez@example.com",
    passWord: "e10adc3949ba59abbe56e057f20f883e",
    CreatedAt: "2024-01-02T09:45:17Z",
    LastLogIn: null,
    isActive: true,
    descripción: "Usuario nuevo, aún no ha iniciado sesión.",
    photo: "",
    deleted: false,
    followers: [],
    followed: [],
  },
  {
    uid: "user345",
    name: "Pedro Martínez",
    userName: "pmartinez",
    email: "pmartinez@example.com",
    passWord: "d8578edf8458ce06fbc567aec4b4aee5",
    CreatedAt: "2024-01-05T14:20:36Z",
    LastLogIn: "2024-01-10T18:35:12Z",
    isActive: true,
    descripción: "Usuario frecuente.",
    photo: "https://example.com/user345.jpg",
    deleted: false,
    followers: ["user123"],
    followed: [],
  },
];