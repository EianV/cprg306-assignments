    import Link from 'next/link';

    export default function StudentInfo() {
      const studentName = "Eian Verastigue";
      const githubRepoLink = "https://github.com/JamesBaes/CPRG304-Assignment1";

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