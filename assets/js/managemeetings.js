document.addEventListener("DOMContentLoaded", () => {
    fetchMeetings();
});

function fetchMeetings() {
    fetch("http://localhost:3000/api/user/getmeetings")
        .then(response => response.json())
        .then(result => {

            const meetings = result.data;

            if (!Array.isArray(meetings) || meetings.length === 0) {
                document.getElementById("meetingTableBody").innerHTML =
                    `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
                return;
            }

            let rows = "";
            meetings.forEach((meeting, index) => {
                const formattedDate = formatDateForDisplay(meeting.meeting_date);
                rows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${meeting.meeting_type}</td>
                        <td>${formattedDate}</td>
                        <td>${meeting.meeting_time}</td>
                        <td>${meeting.meeting_mode}</td>
                        <td>${meeting.meeting_place}</td>
                        <td>${meeting.status}</td>
                        <td>
                            <a href="Edit_Meeting.php?id=${meeting.id}&type=View"
                               class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>

                            <a href="Edit_Meeting.php?id=${meeting.id}&type=Edit"
                               class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i>
                            </a>

                            <a href="#" class="btn btn-sm btn-danger"
                               onclick="return deleteMeeting(${meeting.id})">
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
            });

            document.getElementById("meetingTableBody").innerHTML = rows;
        })
        .catch(error => {
            console.error("Error fetching meetings:", error);
        });
}

function formatDateForDisplay(dateString) {
    if (!dateString) return 'N/A';
    
    try {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }
        
        if (dateString.includes('T')) {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                return 'Invalid Date';
            }
            
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const localDate = new Date(date.getTime() - timezoneOffset);
            
            const day = String(localDate.getDate()).padStart(2, '0');
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const year = localDate.getFullYear();
            
            return `${day}/${month}/${year}`;
        }
        
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        
        return dateString;
    } catch (error) {
        console.error("Error formatting date:", error, "for:", dateString);
        return dateString;
    }
}


function deleteMeeting(id) {
    if (!confirm("Are you sure you want to delete this record?")) return false;

    const userEmail = localStorage.getItem("userEmail");

    fetch(`http://localhost:3000/api/user/deletemeeting/${id}?useremail=${encodeURIComponent(userEmail)}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message || "Deleted successfully");
        fetchMeetings();
    })
    .catch(err => console.error(err));

    return false;
}