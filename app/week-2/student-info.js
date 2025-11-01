    import Link from 'next/link';

    export default function StudentInfo() {
      const studentName = "Eian Verastigue";
      const githubRepoLink = "https://github.com/EianV/cprg306-assignments";

      return (
        <div>
          <p>Name: {studentName}</p>
          <p>
            GitHub Repository: {''}
            <Link href={githubRepoLink}>
            Github Link
            </Link>
          </p>
        </div>
      );
    }