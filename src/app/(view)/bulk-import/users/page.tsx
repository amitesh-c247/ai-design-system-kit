"use client";

import { Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Card from "@/components/pure-components/Card";
import Button from "@/components/pure-components/Button";
import styles from "./styles.module.scss";

const BulkImportUsersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dashboard" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1>Bulk Import Users</h1>
        <p>Import user data with validation and proper formatting</p>
      </div>

      <div className={styles.content}>
        <Card className={styles.comingSoonCard}>
          <div className={styles.comingSoonContent}>
            <div className={styles.icon}>
              <Users size={64} />
            </div>
            <h2>Coming Soon</h2>
            <p>
              User bulk import functionality is currently under development.
              This feature will allow you to import multiple users at once with
              proper validation and error handling.
            </p>
            <div className={styles.features}>
              <h3>Planned Features:</h3>
              <ul>
                <li>Excel/CSV file support</li>
                <li>User data validation</li>
                <li>Duplicate detection</li>
                <li>Role assignment</li>
                <li>Error reporting</li>
                <li>Preview before import</li>
              </ul>
            </div>
            <Link href="/bulk-import/faq">
              <Button variant="primary">Try FAQ Import Instead</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BulkImportUsersPage;
