import os
import subprocess

PACKAGES_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "frontend",
    "packages",
)


def is_git_dirty(repo_path):
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=repo_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        return bool(result.stdout.strip())
    except Exception:
        return False


def main():
    for name in os.listdir(PACKAGES_DIR):
        path = os.path.join(PACKAGES_DIR, name)
        git_dir = os.path.join(path, ".git")
        if os.path.isdir(path) and os.path.isdir(git_dir):
            dirty = is_git_dirty(path)
            status = "DIRTY" if dirty else "clean"
            if dirty:
                print(f"\033[91m{name}: {status}\033[0m")
            else:
                print(f"{name}: {status}")


if __name__ == "__main__":
    main()
