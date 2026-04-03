//Hàm Register
export const registerUser = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("youtube_app_users") || "[]");

    //Kiểm tra Email đã tồn tại chưa
    const exists = users.find(u => u.email === email);
    if (exists) {
        throw new Error("Email already exists");
    }

    const newUser = {
        username,
        email,
        password,
        favorites: []
    };

    users.push(newUser);

    localStorage.setItem("youtube_app_users", JSON.stringify(users));
};

//Hàm Login
export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("youtube_app_users") || "[]");

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) throw new Error("Invalid email or password");

    // lưu username để hiển thị trong header
    localStorage.setItem(
        "current_user",
        JSON.stringify({ email: user.email, username: user.username })
    );
};

// Thêm hoặc xóa video khỏi favorites của user hiện tại
export const toggleFavorite = (video) => {
    const users = JSON.parse(localStorage.getItem("youtube_app_users") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}");

    if (!currentUser?.email) return; // chưa login, không làm gì

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex === -1) return;

    const favorites = users[userIndex].favorites || [];
    const existingIndex = favorites.findIndex(fav => fav.id.videoId === video.id.videoId);

    if (existingIndex >= 0) {
        // đã có video → xóa
        favorites.splice(existingIndex, 1);
    } else {
        // chưa có → thêm vào
        favorites.push(video);
    }

    users[userIndex].favorites = favorites;
    localStorage.setItem("youtube_app_users", JSON.stringify(users));

    // Cập nhật lại current_user để UI biết
    localStorage.setItem("current_user", JSON.stringify(users[userIndex]));

    return users[userIndex].favorites;
};