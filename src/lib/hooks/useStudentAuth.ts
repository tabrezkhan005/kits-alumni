import { supabase } from '../supabase';

export interface StudentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  regNumber: string;
  branch: string;
  batchYear: string;
}

/**
 * Simple auth utilities for student authentication
 * Uses direct database checking instead of hooks
 */

// For development and demo purposes only
const DEMO_USERS = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'student@example.com',
    password_hash: 'password123', // In a real app, this would be hashed
    reg_number: 'REG123456',
    branch: 'Computer Science',
    batch_year: '2020-2024'
  }
];

/**
 * Authenticate a student by email and password
 * @param email Student email
 * @param password Student password (plain text for demo)
 * @returns Promise with authentication result
 */
export async function authenticateStudent(email: string, password: string): Promise<{
  success: boolean;
  message?: string;
  student?: StudentUser;
}> {
  try {
    // Try to use the secure authentication function first (if available)
    const { data: authData, error: authError } = await supabase
      .rpc('authenticate_student', {
        p_email: email,
        p_password: password
      });

    // If the function exists and returns data, use it
    if (!authError && authData) {
      // Make sure student data is in camelCase format
      if (authData.student) {
        // Convert any snake_case properties to camelCase if needed
        const studentData = authData.student;
        if (studentData.first_name !== undefined) {
          authData.student = {
            id: studentData.id || "",
            email: studentData.email || "",
            firstName: studentData.first_name || "",
            lastName: studentData.last_name || "",
            regNumber: studentData.reg_number || "",
            branch: studentData.branch || "",
            batchYear: studentData.batch_year || ""
          };
        }
      }
      return authData;
    }

    // If the function doesn't exist yet, fall back to direct query
    console.log("Falling back to direct query authentication");

    // Query the registered_students table
    const { data, error } = await supabase
      .from('registered_students')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.log("Database query error:", error);

      // Try demo user as fallback
      const demoUser = DEMO_USERS.find(user => user.email === email);

      if (demoUser && demoUser.password_hash === password) {
        return {
          success: true,
          student: {
            id: demoUser.id,
            email: demoUser.email,
            firstName: demoUser.first_name,
            lastName: demoUser.last_name,
            regNumber: demoUser.reg_number,
            branch: demoUser.branch,
            batchYear: demoUser.batch_year
          }
        };
      }

      if (demoUser) {
        return { success: false, message: 'Incorrect password' };
      } else {
        return { success: false, message: 'Student not found' };
      }
    }

    // Check password match (in real app, you'd use proper password verification)
    if (data.password_hash === password) {
      return {
        success: true,
        student: {
          id: data.id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          regNumber: data.reg_number,
          branch: data.branch,
          batchYear: data.batch_year
        }
      };
    } else {
      return { success: false, message: 'Incorrect password' };
    }
  } catch (err) {
    console.error('Authentication error:', err);
    return { success: false, message: 'Server error during authentication' };
  }
}

/**
 * Save student session data to localStorage
 * @param student Student data to save
 */
export function saveStudentSession(student: StudentUser | any): void {
  // Basic validation before saving
  if (!student) {
    console.error("Attempted to save null student data");
    return;
  }

  // Ensure we have email as the primary identifier
  const email = student.email || "";
  if (!email) {
    console.warn("Student data missing email when saving session - this may cause identification issues");
  }

  // Determine if we're dealing with snake_case fields
  const hasSnakeCase = student.first_name !== undefined || student.last_name !== undefined;

  // Ensure required fields are present with proper camelCase format
  const dataToSave = {
    id: student.id || "",
    email: email,
    firstName: hasSnakeCase ? (student.first_name || "") : (student.firstName || ""),
    lastName: hasSnakeCase ? (student.last_name || "") : (student.lastName || ""),
    regNumber: hasSnakeCase ? (student.reg_number || "") : (student.regNumber || ""),
    branch: student.branch || "",
    batchYear: hasSnakeCase ? (student.batch_year || "") : (student.batchYear || "")
  };

  // Log what we're saving to help debug
  console.log("Saving student session data:", JSON.stringify(dataToSave, null, 2));

  try {
    localStorage.setItem('student_user', JSON.stringify(dataToSave));
  } catch (error) {
    console.error("Failed to save student session:", error);
  }
}

/**
 * Get current student session from localStorage
 * @returns Student data or null if not logged in
 */
export function getStudentSession(): StudentUser | null {
  try {
    const userData = localStorage.getItem('student_user');
    if (!userData) {
      return null;
    }

    const parsedData = JSON.parse(userData);

    // Basic validation of parsed data
    if (!parsedData || typeof parsedData !== 'object') {
      console.error("Invalid student data format in session");
      localStorage.removeItem('student_user'); // Clear invalid data
      return null;
    }

    // Check if data is in snake_case or camelCase format
    // If we have first_name instead of firstName, convert it
    const isSnakeCase = parsedData.first_name !== undefined && parsedData.firstName === undefined;

    // Ensure we have email as it's our most reliable identifier
    const email = parsedData.email || "";
    if (!email) {
      console.warn("Student data missing email - this may cause identification issues");
    }

    // Return with defaults for potentially missing properties
    return {
      id: parsedData.id || "",
      email: email,
      firstName: isSnakeCase ? parsedData.first_name : (parsedData.firstName || ""),
      lastName: isSnakeCase ? parsedData.last_name : (parsedData.lastName || ""),
      regNumber: isSnakeCase ? parsedData.reg_number : (parsedData.regNumber || ""),
      branch: parsedData.branch || "",
      batchYear: isSnakeCase ? parsedData.batch_year : (parsedData.batchYear || "")
    };
  } catch (error) {
    console.error('Error reading session:', error);
    return null;
  }
}

/**
 * Clear the student session
 */
export function clearStudentSession(): void {
  localStorage.removeItem('student_user');
}

/**
 * Check if a student is authenticated
 */
export function isStudentAuthenticated(): boolean {
  return getStudentSession() !== null;
}
